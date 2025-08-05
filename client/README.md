This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
product/10f2ace5-797f-450b-ac47-0aae2e36de02
const sortType = [
"Newest",
"Price: Low to High",
"Price: High to High",

];

 useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        category: product.category,
        status: product.status,
      });
    }
  }, [product, reset]);

  const handleImageUploadSuccess = (urls) => {
    setValue("images", urls);
  };

  const onSubmit = async (data) => {
    if (!user.isSignedIn) {
      alert("Please log in to post a product");
      return;
    }
    if (!data.images || data.images.length === 0) {
      alert(
        "Please add at least one image to post a product, Click on upload images button"
      );
      return;
    }
    console.log(data);
    setIsLoading(true);
    try {
      const res = await fetch(product ? `/api/posts/${id}` : "/api/posts/new", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          sellerId: user.user.id,
        }),
      });
      console.log(res);
      const result = await res.json();
      if (result.success) {
        setIsLoading(true);
        alert(product ? "post edited" : "posted successfully!");
        router.push("/");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Application Error:", err);
      alert("Error submitting application");
    }
  };
  
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
