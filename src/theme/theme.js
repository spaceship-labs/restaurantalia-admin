// Break points
const BigScreen = '2200';
const CommonScreen = '1200';
const MediumScreen = '900';
const MediumSmallScreen = '600';
const SmallScreen = '400';

export default {
  // queries
  MediaQueryBig: `@media(min-width: ${BigScreen}px)`,
  MediaQueryCommon: `@media(min-width: ${CommonScreen}px)`,
  MediaQueryMedium: `@media(min-width: ${MediumScreen}px)`,
  MediaQueryMediumSmall: `@media(min-width: ${MediumSmallScreen}px)`,
  MediaQuerySmall: `@media(min-width: ${SmallScreen}px)`,
  // font sizes
  TextSmall: '14px',
};
