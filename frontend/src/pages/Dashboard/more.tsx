import cogoToast from "cogo-toast";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Card } from "../../components";
import { instance } from "../../config";

export const More = () => {
  const params = useParams().id;
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe/" + params, fetcher, {
    suspense: true,
  });

  if (error) {
    console.log(error);
    cogoToast.error(error);
    return null;
  }

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="flex items-center justify-center">
        <Card
          isFull={true}
          id={data?._id}
          title={data?.title}
          image={data?.image?.url}
          ingredients={data?.ingredients}
          note={data?.note}
          description={data?.description}
          email={data?.user?.email}
          avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </div>
      ;
    </Suspense>
  );
};