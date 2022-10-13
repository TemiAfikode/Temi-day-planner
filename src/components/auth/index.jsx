import { useState, useContext, useEffect } from "react";
import isEmail from "isemail";
import validateState from "validation/stateValidation";
import userContext from "context/user/userContext";
import style from "./auth.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signIn, useSession } from "next-auth/react";

const PasswordChecklist = dynamic(() => import("react-password-checklist"), {
  ssr: false,
});

const initialLoginState = {
  email: "",
  password: "",
};

const initialErrorState = {
  open: false,
  errors: [{ message: "", path: "" }],
};

export default function AuthComp({ isLogin }) {
  if (isLogin) return <LoginComp />;
  return <RegisterComp />;
}

const LoginComp = () => {
  const [value, setValue] = useState(initialLoginState);
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(initialErrorState);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const errors = validateState(value);
    if (errors.length > 0) {
      setShowError({
        open: true,
        errors,
      });
      setLoading(false)
      return;
    }
    if (!isEmail.validate(value.email)) {
      setShowError({
        open: true,
        errors: [{ message: "Invalid email address", path: "email" }],
      });
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      callbackUrl: "/dashboard",
      redirect: false,
      email: value.email,
      password: value.password,
    });

    if (res.ok) {
      router.push("/dashboard");
      return
    } else {
      setShowError({
        open: true,
        errors: [{ message: res.error, path: null }],
      });
      setLoading(false);
      return
    }
  };

  const onChange = (e) => {
    setShowError(initialErrorState);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={style["auth-page"]}>
      <div className={style["auth-container"]}>
        <div className={style["auth-container-lhs"]}>
          <div className={style["auth-logo"]}>
            <img src="/imgs/logo.svg" alt="" />
          </div>
          <h2>Start your day organised and achieve more...</h2>
        </div>
        <div className={style["auth-container-rhs"]}>
          <div className={style["auth-form"]}>
            <h1 className="about-header">Login</h1>

            <form onSubmit={onSubmit} className="form">
              {showError.errors[0].message && (
                <span style={{ marginBottom: "1rem" }} className="error">
                  {showError.errors[0].message}
                </span>
              )}
              <div className="form-control">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={value.email}
                  onChange={onChange}
                />
                {showError.open &&
                  showError.errors.some((e) => e.path === "email") && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find((e) => e.path === "email").message
                      }{" "}
                    </span>
                  )}
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={value.password}
                  onChange={onChange}
                />
                {showError.open &&
                  showError.errors.some((e) => e.path === "password") && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find((e) => e.path === "password")
                          .message
                      }{" "}
                    </span>
                  )}
              </div>
              <div className={"form-control " + style["form-control-footer"]}>
                <button type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "Login"}
                </button>
                <div className={style["have-account"]}>
                  <Link href="/register" className={style["redirect-link"]}>
                    You don&apos;t have an account?
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className={style["have-account-mobile"]}>
            <Link href="/register" className={style["redirect-link"]}>
              You don&apos;t have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const initialRegisterState = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  confirmPassword: "",
};

const RegisterComp = () => {
  const [value, setValue] = useState(initialRegisterState);
  const [showError, setShowError] = useState(initialErrorState);
  const [loading, setLoading] = useState(false)

  const {  registerUser, error } = useContext(userContext);

  useEffect(() => {
    if (error) {
      setShowError({
        open: true,
        errors: [
          { message: error && error.message, path: error && error.path[0] },
        ],
      });
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateState(value);
    if (errors.length > 0) {
      setShowError({
        open: true,
        errors,
      });
      setLoading(false);
      return;
    }
    if (!isEmail.validate(value.email)) {
      setShowError({
        open: true,
        errors: [{ message: "Invalid email address", path: "email" }],
      });
      setLoading(false);
      return;
    }
    if (
      !isValidPassword(value.password) ||
      value.password !== value.confirmPassword
    ) {
      setShowError({
        open: true,
        errors: [
          {
            message: "Password has not passed the mininum password strength",
            path: "password",
          },
        ],
      });
      setLoading(false);
      return;
    }

    registerUser(value);
  };

  const onChange = (e) => {
    setShowError(initialErrorState);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={style["auth-page"]}>
      <div className={style["auth-container"]}>
        <div className={style["auth-container-lhs"]}>
          <div className={style["auth-logo"]}>
            <img src="/imgs/logo.svg" alt="" />
          </div>
          <h2>Start your day organised and achieve more...</h2>
        </div>
        <div className={style["auth-container-rhs"]}>
          <div className={style["auth-form"]}>
            <h1 className="about-header">Register</h1>
            <form onSubmit={onSubmit} className="form">
              {showError.errors[0].message && (
                <span style={{ marginBottom: "1rem" }} className="error">
                  {showError.errors[0].message}
                </span>
              )}
              <div className="form-control">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={value.email}
                  onChange={onChange}
                />
                {!error &&
                  showError.open &&
                  showError.errors.some((e) => e.path === "email") && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find((e) => e.path === "email").message
                      }{" "}
                    </span>
                  )}
              </div>
              <div className="form-control">
                <label htmlFor="firstname">First name:</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter firstname"
                  value={value.firstname}
                  onChange={onChange}
                />
                {!error &&
                  showError.open &&
                  showError.errors.some((e) => e.path === "firstname") && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find((e) => e.path === "firstname")
                          .message
                      }{" "}
                    </span>
                  )}
              </div>
              <div className="form-control">
                <label htmlFor="lastname">Last name:</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter lastname"
                  value={value.lastname}
                  onChange={onChange}
                />
                {!error &&
                  showError.open &&
                  showError.errors.some((e) => e.path === "lastname") && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find((e) => e.path === "lastname")
                          .message
                      }{" "}
                    </span>
                  )}
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={value.password}
                  onChange={onChange}
                />
                {!error &&
                  showError.open &&
                  showError.errors.some((e) => e.path === "password") && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find((e) => e.path === "password")
                          .message
                      }{" "}
                    </span>
                  )}
              </div>
              <div className="form-control">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="Enter password again"
                  value={value.confirmPassword}
                  onChange={onChange}
                />
                {!error &&
                  showError.open &&
                  showError.errors.some(
                    (e) => e.path === "confirmPassword"
                  ) && (
                    <span className="error">
                      {" "}
                      {
                        showError.errors.find(
                          (e) => e.path === "confirmPassword"
                        ).message
                      }{" "}
                    </span>
                  )}
                <PasswordChecklist
                  rules={[
                    "lowercase",
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "match",
                  ]}
                  minLength={8}
                  value={value.password}
                  valueAgain={value.confirmPassword}
                  iconSize={13}
                  className={style["password-checklist"]}
                  messages={{
                    lowercase: "Must contain at least one lowercase character.",
                    minLength: "Must be at least 8 characters long.",
                    specialChar: "Must contain at least one character.",
                    number: "Must contain at least one number.",
                    capital: "Must contain at one capital letter.",
                    match: "Password must match.",
                  }}
                />
              </div>
              <div className={"form-control " + style["form-control-footer"]}>
                <button type="submit" disabled={loading}>
                  {loading || status === "loading"
                    ? "Please wait..."
                    : "Register"}
                </button>
                <div className={style["have-account"]}>
                  <Link href="/login" className={style["redirect-link"]}>
                    You already have an account?
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className={style["have-account-mobile"]}>
            <Link href="/login" className={style["redirect-link"]}>
              You already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const isValidPassword = (value) => {
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp = /.{8,}/;

  const uppercase = uppercaseRegExp.test(value);
  const lowercase = lowercaseRegExp.test(value);
  const digits = digitsRegExp.test(value);
  const specialChar = specialCharRegExp.test(value);
  const minLength = minLengthRegExp.test(value);

  return uppercase && lowercase && digits && specialChar && minLength;
};
