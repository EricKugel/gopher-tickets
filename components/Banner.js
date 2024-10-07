import Link from "next/link";

const Banner = () => {
    return (
      <>
        <div id="banner">
          <Link href="/">
            <div>gopher-tickets.com</div>
          </Link>
          <Link href="/profile">
            <div>Edit Profile</div>
          </Link>
        </div>
        <style jsx>{`
          #banner {
            background-color: gray;
            padding: 20px;
            font-size: 20px;
            font-family: monospace;
            font-weight: bold;
          }
        `}</style>
      </>
    );
  };
  
  export default Banner;
  