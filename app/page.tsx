import UniqButton from "@/components/UniqButton/UniqButton";
import css from "./page.module.css";

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <section className={css.hero}>
          <div className={css.wrapper}>
            <div className={css.textContent}>
              <h1 className={css.title}>Campers of your dreams</h1>
              <p className={css.text}>
                You can find everything you want in our catalog
              </p>
            </div>
            <div className={css.buttonWrapper}>
              <UniqButton type="link" href="/catalog">
                View Now
              </UniqButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
