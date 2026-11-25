import type * as React from 'react';
export type IconName = 'arrow-right' | 'arrow-up-right' | 'caret-down' | 'caret-up' | 'cart' | 'external' | 'x' | 'list';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = ui-cyan (Donate, Sign Up, Apply Now) · outline = black border (Shop) · purple = brand purple · ghost = soft panel ("Make a Request") · link = text only */
  variant?: 'primary' | 'outline' | 'purple' | 'ghost' | 'link';
  shape?: 'pill' | 'rounded' | 'square';
  icon?: IconName;
  href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TagProps { active?: boolean; onClick?: () => void; children?: React.ReactNode }
export declare function Tag(props: TagProps): React.ReactElement;
export interface FilterSelectProps { label?: string; active?: boolean; open?: boolean; onClick?: () => void }
export declare function FilterSelect(props: FilterSelectProps): React.ReactElement;
export interface NavLink { label: string; href?: string }
export interface NavBarProps { logoSrc: string; cobrandSrc?: string; cobrandAlt?: string; links?: Array<string | NavLink>; menus?: Record<string, NavLink[]>; active?: string; ctaLabel?: string; ctaHref?: string; shopHref?: string; homeHref?: string; id?: string }
export declare function NavBar(props: NavBarProps): React.ReactElement;
export interface PathwayCardProps { index?: string; title: string; description: string; tone?: 'gray' | 'purple'; href?: string }
export declare function PathwayCard(props: PathwayCardProps): React.ReactElement;
export interface StoryCardProps { programme?: string; imageSrc?: string; imageAlt?: string; quote: string; impact?: string; author?: string; ctaLabel?: string; href?: string }
export declare function StoryCard(props: StoryCardProps): React.ReactElement;
export interface IconProps { name: IconName; size?: number; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
declare global { interface Window { Techrity: { Button: typeof Button; Tag: typeof Tag; FilterSelect: typeof FilterSelect; NavBar: typeof NavBar; PathwayCard: typeof PathwayCard; StoryCard: typeof StoryCard; Icon: typeof Icon } } }
