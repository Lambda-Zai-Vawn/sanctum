
import { cn } from "@/lib/utils";
import * as React from "react";

const IconWrapper = ({ className, children, ...props }: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-foreground", className)}
        {...props}
    >
        {children}
    </svg>
);

export const LambdaXiVONIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M3.5 18.5 L12 5 L20.5 18.5 M6 14 L18 14" strokeWidth="2" />
        <path d="M10 12 L12 14.5 L14 12" strokeWidth="1.5" />
    </IconWrapper>
);

export const OrbIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <defs>
            <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
                <stop offset="100%" stopColor="hsl(var(--accent) / 0.7)" />
            </radialGradient>
            <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#orbGradient)" filter="url(#orbGlow)" />
        <g className="transition-transform duration-300 ease-in-out" style={{ transformOrigin: 'center' }}>
            <line x1="8" y1="12" x2="16" y2="12" className="transition-transform duration-300 ease-in-out" style={{ transform: props['data-state'] === 'open' ? 'rotate(45deg)' : 'rotate(0deg)', transformOrigin: 'center' }}/>
            <line x1="8" y1="12" x2="16" y2="12" className="transition-transform duration-300 ease-in-out" style={{ transform: props['data-state'] === 'open' ? 'rotate(-45deg)' : 'rotate(0deg)', transformOrigin: 'center' }}/>
        </g>
    </IconWrapper>
);


export const ObeliskIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M6 2h12l-2 20H8L6 2z" />
        <path d="M6 2L12 0l6 2" />
    </IconWrapper>
);

export const CanadianMapleLeafIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 20 20" {...props}>
        <path fill="currentColor" d="M16.9,8.2l-6-2.7c-0.1,0-0.1-0.1-0.2-0.1H10h-0.2c-0.1,0-0.1,0-0.2,0.1l-6,2.7c-0.4,0.2-0.6,0.6-0.5,1 c0.2,0.4,0.6,0.6,1,0.5L8.5,8.4V11l-3.8,1.9c-0.4,0.2-0.6,0.6-0.5,1c0.2,0.4,0.6,0.6,1,0.5L9,12.3v2.4l-2.6,1.3 c-0.4,0.2-0.6,0.6-0.5,1c0.2,0.4,0.6,0.6,1,0.5l2.1-1.1V18h1v-1.9l2.1,1.1c0.4,0.2,0.8,0,1-0.5c0.2-0.4,0-0.8-0.5-1L11,14.7 V12.3l4.3,2.1c0.4,0.2,0.8,0,1-0.5c0.2-0.4,0-0.8-0.5-1L11.5,11V8.4l4.3,1.3c0.4,0.2,0.8,0,1-0.5C17.5,8.8,17.3,8.4,16.9,8.2z" />
    </IconWrapper>
);

export const ShatteredIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="m2 12 5.2 0" />
        <path d="m16.8 12 5.2 0" />
        <path d="m12 2 0 5.2" />
        <path d="m12 16.8 0 5.2" />
        <path d="m4.9 4.9 3.68 3.68" />
        <path d="m15.42 15.42 3.68 3.68" />
        <path d="m4.9 19.1 3.68-3.68" />
        <path d="m15.42 8.58 3.68-3.68" />
        <path d="m9 15 3-3" />
    </IconWrapper>
);

export const SkullIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props} fill="none">
        <path d="M12,2A10,10,0,0,0,2,12v4a4,4,0,0,0,4,4h1a1,1,0,0,0,1-1V17a1,1,0,0,1,2,0v2a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V17a1,1,0,0,1,2,0v2a1,1,0,0,0,1,1h1a4,4,0,0,0,4-4V12A10,10,0,0,0,12,2Z"/>
        <circle cx="8.5" cy="11.5" r="1"/>
        <circle cx="15.5" cy="11.5" r="1"/>
        <path d="M10 16.5l2-1.5 2 1.5"/>
    </IconWrapper>
);

export const ChainsIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </IconWrapper>
);

export const AegisSigilIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M12 2L2 12l10 10 10-10L12 2z"/>
        <path d="M2 12h20"/>
        <path d="M12 2v20"/>
    </IconWrapper>
);

export const LoomSigilIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="1"/>
        <path d="M4 12h16"/>
        <path d="M12 4v16"/>
    </IconWrapper>
);

export const MicroAppsSigilIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M12 2.24l-7.39 4.27v8.46l7.39 4.27 7.39-4.27v-8.46L12 2.24z"/>
    </IconWrapper>
);

export const MicrophoneIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </IconWrapper>
);
