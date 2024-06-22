import { fetchProducts } from "@/state/product/product-slice";
import { AppDispatch, RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Product from "./Product";
import { Button } from "./ui/button";

import Lodash from "lodash";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products.value);
  const totalPages = useSelector(
    (state: RootState) => state.products.totalPages
  );

  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts({ page, pageSize: 10 }));
  }, [page]);

  //   const pageRange = Lodash.range(1, totalPages as number);

  return (
    <div className="mt-60 w-full px-10 flex-1 flex flex-col dark:bg-[#1F1F1F] no-scrollbar">
      <div className="grid grid-cols-1 self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Product
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 justify-center p-10">
        <Button
          variant="ghost"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1 ? true : false}
        >
          <PaginationPrevious />
        </Button>

        <Button
          variant="ghost"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages ? true : false}
        >
          <PaginationNext />
        </Button>
      </div>
    </div>
  );
};

export default ProductList;