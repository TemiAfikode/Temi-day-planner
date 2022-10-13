import React from 'react'
import style from './about.module.css'

export default function About() {
  return (
    <section className={style["about"]}>
      <div className="container">
        <div className={style["about-content"]}></div>
        <h1 className="about-header">About</h1>
        <div className={style["about-content-wrapper"]}>
          <div className={style["about-lhs"]}>
            <div>
              <img src="/imgs/about-us-temi.jpg" alt="about-us image" />
            </div>
          </div>
          <div className={style["about-rhs"]}>
            <div>
              <p>
                Over 10years we have perfected task management for our client,
                we noticed that people who make write down what they want to do
                have 70% success inachieving it than people who don&apos;t.
              </p>
              <p>
                We have desired to make this application for everyone, because
                the more successful people are daily the more happier they
                become and the healthier our society bcome.
              </p>
              <p>
                Follow us on our social media handle to read more of our
                stories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
