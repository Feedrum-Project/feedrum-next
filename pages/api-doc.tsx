import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{
  spec: any;
}>(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="wrapperSwagger">
      <SwaggerUI spec={spec} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Docs for Feedrum.API",
        version: "1.0"
      },
      tags: [
        { name: "Authentication" },
        { name: "Post" },
        { name: "Comment" },
        { name: "Image" },
        { name: "User" }
      ]
    }
  });

  return {
    props: {
      spec
    }
  };
};

export default ApiDoc;
