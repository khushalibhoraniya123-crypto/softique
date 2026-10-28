import React from 'react';

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'dark' | 'whatsapp' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
  ariaLabel,
}) {
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs uppercase tracking-wider',
    md: 'px-6 py-3 text-sm font-medium tracking-wide',
    lg: 'px-8 py-4 text-base font-medium tracking-wide',
  };

  const variantStyles = {
    primary:
      'bg-[#1C1E21] text-[#FAF8F5] border border-[#2D3136] hover:bg-[#2F343B] hover:border-[#4B535E] shadow-sm active:scale-[0.98]',
    secondary:
      'bg-[#EFECE4] text-[#1C1E21] border border-[#DCD5C8] hover:bg-[#E5DFD4] hover:border-[#C8BFB0] shadow-sm active:scale-[0.98]',
    outline:
      'bg-transparent text-[#1C1E21] border border-[#C8BFB0] hover:bg-[#F2EEE6] hover:border-[#1C1E21] active:scale-[0.98]',
    dark:
      'bg-[#FFFFFF] text-[#12151A] border border-white hover:bg-[#EFECE4] shadow-md active:scale-[0.98]',
    darkOutline:
      'bg-transparent text-[#FAF8F5] border border-[#3A4452] hover:bg-[#202732] hover:border-[#FAF8F5] active:scale-[0.98]',
    whatsapp:
      'bg-[#128C7E] text-white border border-[#0E7569] hover:bg-[#075E54] shadow-sm active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#1C1E21] hover:text-[#0E63B8] hover:bg-black/5 active:scale-[0.98]',
  };

  const combinedClass = `inline-flex items-center justify-center gap-2.5 rounded-full transition-all duration-200 cursor-pointer text-center font-sans select-none disabled:opacity-50 disabled:pointer-events-none ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        aria-label={ariaLabel}
      >
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      aria-label={ariaLabel}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

