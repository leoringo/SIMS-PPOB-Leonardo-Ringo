export default function Banners({banner}) {
    return (
        <>
        {console.log(banner, `INI DARI BANNERS`)}
        <img src={banner.banner_image} alt="banners" />
        </>
    )
}