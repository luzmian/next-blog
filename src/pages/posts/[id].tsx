import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import type { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { getAllPostIds, getPostData } from "../../../utils/posts";
// 引入代码高亮css
import "prismjs/themes/prism-okaidia.min.css";

interface Props {
  postData: {
    title: string;
    date: string;
    content: MDXRemoteProps;
  };
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className="text-3xl font-extrabold my-4 tracking-tighter">
        {postData.title}
      </h1>
      <Date dateString={postData.date} />
      <article className="py-8 prose prose-h1:mt-8">
        <MDXRemote {...postData.content} />
      </article>
    </Layout>
  );
}

// getStaticProps和getStaticPaths只在服务器端运行，永远不会在客户端运行
export const getStaticPaths: GetStaticPaths = async () => {
  // 获取所有文章id，即所有路由
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //获取文章内容
  const postData = await getPostData(params!.id as string);
  return {
    props: {
      postData,
    },
  };
};
