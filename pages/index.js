import styles from "../styles/Home.module.css";

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <div className={styles.container}>
      Current session: {JSON.stringify(session?.data)}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Gopher Tickets!
        </h1>
      </main>
    </div>
  );
}
