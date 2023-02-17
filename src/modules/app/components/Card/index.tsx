import { FC, ReactElement } from "react";

import { Card as PrimeCard } from "primereact/card";

interface CardProps {
  children?: ReactElement | ReactElement[];
  title?: string;
  style?: string;
  header?: any;
  footer?: any;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  style,
  header,
  footer,
}) => {
  return (
    <PrimeCard
      className={`${style}`}
      title={title}
      header={header}
      footer={footer}
    >
      {children}
    </PrimeCard>
  );
};
