import type { Theme } from '~components/BladeProvider';
import type { DotNotationColorStringToken } from '~src/_helpers/types';

const checkboxSizes = {
  group: {
    gap: {
      small: {
        mobile: 'spacing.2',
        desktop: 'spacing.0',
      },
      medium: {
        mobile: 'spacing.3',
        desktop: 'spacing.2',
      },
    },
  },
  icon: {
    small: {
      width: 12,
      height: 12,
    },
    medium: {
      width: 16,
      height: 16,
    },
  },
} as const;

type ColorTokens = `colors.${DotNotationColorStringToken<Theme['colors']>}` | 'transparent';
type Variant = {
  border: {
    checked: ColorTokens;
    unchecked: ColorTokens;
  };
  background: {
    checked: ColorTokens;
    unchecked: ColorTokens;
  };
};

type CheckboxIconColors = {
  variants: {
    default: Variant;
    disabled: Variant;
    negative: Variant;
  };
};

const checkboxIconColors: CheckboxIconColors = {
  variants: {
    default: {
      border: {
        checked: 'colors.brand.primary.500',
        unchecked: 'colors.brand.gray.500',
      },
      background: {
        checked: 'colors.brand.primary.500',
        unchecked: 'transparent',
      },
    },
    disabled: {
      border: {
        checked: 'transparent',
        unchecked: 'colors.brand.gray.a100',
      },
      background: {
        checked: 'colors.brand.gray.a100',
        unchecked: 'transparent',
      },
    },
    negative: {
      border: {
        checked: 'colors.feedback.border.negative.highContrast',
        unchecked: 'colors.feedback.border.negative.highContrast',
      },
      background: {
        checked: 'colors.feedback.background.negative.highContrast',
        unchecked: 'colors.feedback.background.negative.lowContrast',
      },
    },
  },
} as const;

export { checkboxSizes, checkboxIconColors };
