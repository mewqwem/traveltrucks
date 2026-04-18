import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import css from "./UniqButton.module.css";

interface LinkProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "type"
> {
  type: "link";
  href: string;
}

interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "type"> {
  type?: "button" | "submit" | "reset";
  href?: never;
}

type Props = LinkProps | ButtonProps;

function UniqButton(props: Props) {
  if (props.type === "link") {
    const { ...linkProps } = props;
    return <Link className={css.button} {...linkProps} />;
  }

  const { type, ...buttonProps } = props;
  return (
    <button className={css.button} type={type || "button"} {...buttonProps} />
  );
}

export default UniqButton;
