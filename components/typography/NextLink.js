import Link from 'next/link';

const NextLink = ({ href, className, children, ...rest }) => {
  return (
    <Link href={href}>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default NextLink;
