import * as React from "react";

export type IconPropsType = {
  fill?: string;
} & React.ComponentPropsWithoutRef<"svg">;

export type VisuallyHiddenPropsType = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"span">;

export interface TitlePropsType extends React.HTMLAttributes<HTMLHeadingElement> {
  level: keyof React.JSX.IntrinsicElements;
  ariaLevel?: number | undefined;
  children: React.ReactNode;
}

export interface CardTitlePropsType extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  ariaLevel?: number;
}

export type ContainerPropsTypes<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export type ListPropsType<Item, As extends React.ElementType> = {
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
  as?: As;
};

export type EntrepreneurDataType = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  startupName: string;
  bio: string;
  startupDescription: string;
  fundingNeed: string;
  industry: string;
  location: string;
  website: string;
  foundedYear: number;
  teamSize: number;
  avatar: string;
}[];

export type InvestorDataType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  bio: string;
  investmentInterests: string[];
  portfolioCompanies: string[];
  investmentRange: string;
  location: string;
  firm: string;
  website: string;
  yearsExperience: number;
  totalInvestments: number;
  avatar: string;
}[];

export type CollaborationRequestDataType = {
  id: number;
  investorId: number;
  entrepreneurId: number;
  status: string;
  message: string;
  createdAt: string;
}[];

export interface EntrepreneurProfilePropsType {
  entrepreneur: EntrepreneurDataType[number];
}

export interface EntrepreneurCardPropsType {
  entrepreneur: EntrepreneurDataType[number];
}

export interface InvestorCardProps {
  investor: InvestorDataType[number];
}
