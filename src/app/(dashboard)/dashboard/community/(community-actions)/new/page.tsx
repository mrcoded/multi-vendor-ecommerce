import React, { Suspense } from "react";

import Loading from "@/app/loading";

import CommunityPostForm from "@/components/forms/CommunityPostForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewCommunityPost = async () => {
  return (
    <div>
      <FormHeader title="New Community Post" />
      <Suspense fallback={<Loading />}>
        <CommunityPostForm />
      </Suspense>
    </div>
  );
};

export default NewCommunityPost;
