import fs from "fs";
import path from "path";
import { ProductType } from "@/app/page";
import { NextRequest, NextResponse } from "next/server";

export interface RouteParams {
  params: {
    id: string | number;
  };
}

export const GET = async (req: NextRequest, { params }: RouteParams) => {
  const { id } = params;
  const filePath = path.join(process.cwd(), "database/products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const product = products.find((item: ProductType) => item.id === +id);
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json(
      { message: "Ko lấy được sản phẩm theo id" }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const filePath = path.join(process.cwd(), "database/products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const productIndex = products.findIndex(
      (item: { id: number }) => item.id === +id
    );
    const updatedProductData = await req.json();
    if (productIndex === -1) {
      return NextResponse.json(
        { message: "Ko thấy sản phẩm cần sửa" },
        { status: 404 }
      );
    }
    products[productIndex] = { ...products[productIndex], ...updatedProductData };
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ message: "Sửa thành công" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Ko sửa đc sản phẩm" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: RouteParams) => {
  const { id } = params;
  try {
    const filePath = path.join(process.cwd(), "database/products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const remainingProducts = products.filter(
      (product: ProductType) => product.id !== +id
    );
    fs.writeFileSync(filePath, JSON.stringify(remainingProducts, null, 2), "utf8");
    return NextResponse.json({ message: "Xóa thành công" });
  } catch (error) {
    return NextResponse.json(
      { message: "Ko xóa đc" },
      { status: 500 }
    );
  }
};