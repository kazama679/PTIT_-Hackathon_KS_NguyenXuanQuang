import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async (req: NextRequest) => {
  try {
    const filePath = path.join(process.cwd(), "database/products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const { searchParams } = new URL(req.url);
    const searchName = searchParams.get("name");
    if (searchName) {
      const filteredProducts = products.filter((product: { productName: string }) =>
        product.productName.toLowerCase().includes(searchName.toLowerCase())
      );
      return NextResponse.json(filteredProducts);
    }
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Ko lấy được sản phẩm" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const filePath = path.join(process.cwd(), "database/products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newProduct = await req.json();
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ message: "Thêm sản phẩm thành công" });
  } catch (error) {
    return NextResponse.json({ message: "Ko thêm đc sản phẩm" });
  }
};