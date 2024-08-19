import './Banner.css'

interface BannerProps{
    src: string
    alt?:string
}

export default function Banner ({ src, alt }: BannerProps){
    return(
        <header className='banner'>
            <img src={src} alt={alt}/>
        </header>
        
    )
}

