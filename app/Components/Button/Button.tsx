import React from "react";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    variant?: "primary" | "foreground" | "danger";
    rounded?: boolean;
    fullWidth?: boolean;
    iconOnly?: boolean;
    iconSize?: 'sm' | 'm' | 'lg' | 'xl';
};

export function Button({
    children,
    loading = false,
    disabled,
    variant = "primary",
    rounded = true,
    fullWidth = false,
    iconOnly = false,
    iconSize = 'm',
    className,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;
    const iconSizeMap: { [key: string]: string } = {
        'sm': '1.25rem',
        'm': '1.5rem',
        'lg': '2rem',
        'xl': '2.75rem',
    };

    const iconStyles = iconOnly ? {
        width: iconSizeMap[iconSize],
        height: iconSizeMap[iconSize],
    } : undefined;

    return (
        <button
            {...props}
            disabled={isDisabled}
            className={
                [
                    styles.button,
                    styles[variant],
                    rounded && styles.rounded,
                    fullWidth && styles.fullWidth,
                    iconOnly && styles.iconOnly,
                    isDisabled && styles.disabled,
                    className, // allows external overrides
                ]
                    .filter(Boolean)
                    .join(" ")
            }
            style={iconStyles}
        >
            {loading ? "Loading..." : children}
        </button >
    );
}
