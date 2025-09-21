"use server"

import { Prisma } from "@/lib/generated/prisma";
import { getUserID } from "./user.action"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export default async function getProducts(searchTerm?: string) {
    try {
        const currentUserId = await getUserID();
        if (typeof currentUserId !== "string" || !currentUserId) {
            return { success: false, userProducts: [] };
        }

        const whereClause: {
            userId: string;
            name?: {
                contains: string;
                mode: 'insensitive';
            };
        } = {
            userId: currentUserId,
        };

        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: 'insensitive'
            };
        }

        const userProducts = await prisma.product.findMany({
            where: whereClause,
        });

        // revalidatePath("user/products");

        return { success: true, userProducts };
    } catch (error) {
        console.error("Error fetching plants:", error);
        return { success: false, userProducts: [], error: "Failed to fetch plants" };
    }
}


export async function createProduct(data: Prisma.ProductCreateInput) {
    try {
        const currentUserId = await getUserID()
        if( typeof currentUserId !== "string" || !currentUserId) throw new Error("User not authonticat")

        const newProduct = await prisma.product.create({
            data: {
                ...data,
                userId: currentUserId
            }
        });

        revalidatePath('/user/products')
        return newProduct;

    } catch (error) {
        console.error("New product not created", error)
        throw error
    }
}


export async function deleteProduct (id: string) {

    try {
        
        const currentUserId = await getUserID()

        if(!currentUserId) throw new Error("Product not deleted")

        await prisma.product.delete({
            where: {id}
        })

        revalidatePath("/user/products")

    } catch (error) {
        console.error("Product not deleted:", error)
        throw error
    }

}

export async function editProduct (id: string ,data: Prisma.ProductUpdateInput) {

    try {
        const currentUserId = await getUserID()
        if( typeof currentUserId !== "string" ||  !currentUserId) throw new Error("Not Authankicte")

        await prisma.product.update({
            where: {id},
            data: {
                ...data,
                userId: currentUserId
            }
        })

        revalidatePath("/user/products")

    } catch (error) {
        console.error("Product not updated:", error)
        throw error
    }

}


export async function getProductById (id: string) {
    try {
        return await prisma.product.findMany({
            where: {id}
        })
    } catch (error) {
        console.error("Products not finded:", error)
        throw error
    }
}