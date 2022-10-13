import { mdiCheckboxMarkedCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import Link from 'next/link';
import style from './pricing.module.css'

export default function Pricing() {
  return (
    <section className={style["pricing"]}>
      <div className={"container " + style["pricing-container"]}>
        <h1 className="about-header">Pricing</h1>
        <div className={style["pricing-wrapper"]}>
          <ul className={style["pricing-card-list"]}>
            <li className={style["pricing-card"]}>
              <div className={style["pricing-card-header"]}>
                <h2>Basic</h2>
                <p>Forever free</p>
              </div>
              <div className={style["pricing-card-body"]}>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>15 tasks max per day</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Edit task</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Delete task</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Prioritize task</p>
                </div>
              </div>
              <div className={style["pricing-card-footer"]}>
                <Link href="/register">
                  <a className="btn btn-primary">Free Acount</a>
                </Link>
              </div>
            </li>
            <li className={style["pricing-card"]}>
              <div className={style["pricing-card-header"]}>
                <h2>Pro</h2>
                <p className={style["pro-price"]}>$10.99/month</p>
              </div>
              <div className={style["pricing-card-body"]}>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Unlimited tasks per day</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Edit task</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Delete task</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className="pricing-icon"
                    />
                  </span>
                  <p>Prioritize task</p>
                </div>
                <div className={style["available-ft"]}>
                  <span>
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      className={style["pricing-icon"]}
                    />
                  </span>
                  <p>Share task with others</p>
                </div>
              </div>
              <div className={style["pricing-card-footer"]}>
                <Link href="/dashboard">
                  <a className="btn btn-primary">Get Started</a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
