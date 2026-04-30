type PageTitleProps = {
    eyebrow?: string
    title: string
    subtitle?: string
    subtitleVariant?: "uppercase" | "italic"
    as?: "header" | "div"
    headingLevel?: 1 | 2 | 3
    className?: string
}

/**
 * @param as - Use "header" for page-level titles (pairs with headingLevel=1),
 *             "div" for section titles (pairs with headingLevel=2 or 3)
 */
export function PageTitle({
    eyebrow,
    title,
    subtitle,
    subtitleVariant = "uppercase",
    as = "header",
    headingLevel = 1,
    className
}: PageTitleProps) {
    const rootClass = ["page-title-block", className].filter(Boolean).join(" ");
    const RootTag = as as React.ElementType;
    const headingMap = { 1: "h1", 2: "h2", 3: "h3" } as const;
    const HeadingTag = headingMap[headingLevel];
    const sharedClass = "text-spaced text-uppercase text-muted small mb-1";

    const subtitleClassName = [
        "text-spaced text-muted page-title-subtitle",
        subtitleVariant === "italic" ? "fst-italic fs-6" : "text-uppercase small mb-1"
    ].join(" ");

    return (
        <RootTag className={rootClass}>
            {eyebrow ? (
                <p className={sharedClass}>{eyebrow}</p>
            ) : null}
            <HeadingTag className="page-title heading fw-semibold">{title}</HeadingTag>
            {subtitle ? (
                <p className={subtitleClassName}>{subtitle}</p>
            ) : null}
        </RootTag>
    )
}
