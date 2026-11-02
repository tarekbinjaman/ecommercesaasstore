export function ProductPage({ slug }: { slug: string }) {
    return(
        <div className="text-black">
            <h1>This is product page from Market place theme.</h1>
            <p>Product Slug: {slug}</p>
        </div>
    )
}