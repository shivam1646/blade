import type { ComponentStory, Meta } from '@storybook/react';
import {
  Title as StorybookTitle,
  Subtitle,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
  Description,
} from '@storybook/addon-docs';
import { Highlight } from '@storybook/design-system';
import type { ReactElement } from 'react';
import { Button } from '~components/Button';
import { Link } from '~components/Link';
import { SkipNavContent, SkipNavLink } from '~components/SkipNav';
import { Text } from '~components/Typography';
import Box from '~components/Box';

const Page = (): ReactElement => {
  return (
    <>
      <StorybookTitle />
      <Description>SkipNav component is only available on web.</Description>
      <Subtitle>
        The SkipNav component lets users skip the navigation and jump to the main content of the
        page. Useful when you have navbars at the top and the user wants to jump directly to the
        main content.
      </Subtitle>
      <br />
      <br />
      <StorybookTitle>Usage</StorybookTitle>
      <Highlight language="tsx">{`import { SkipNavLink, SkipNavContent } from '@razorpay/blade/components'`}</Highlight>
      <StorybookTitle>Example</StorybookTitle>
      <Primary />
      <StorybookTitle>Properties</StorybookTitle>
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </>
  );
};

const SkipNavStoryMeta: Meta = {
  title: 'Components/Accessibility/SkipNav',
  component: SkipNavLink,
  args: {},
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
};

const SkipNavTemplate: ComponentStory<typeof SkipNavLink> = () => {
  return (
    <>
      <SkipNavLink>Skip to content</SkipNavLink>
      <SkipNavLink id="second">Skip to second content</SkipNavLink>
      <nav style={{ display: 'flex' }}>
        <ul style={{ marginLeft: 'auto', display: 'flex', listStyle: 'none', gap: '10px' }}>
          <li>
            <Link href="#1">Home</Link>
          </li>
          <li>
            <Link href="#2">Pricing</Link>
          </li>
          <li>
            <Link href="#3">Login</Link>
          </li>
          <li>
            <Link href="#4">SignUp</Link>
          </li>
        </ul>
      </nav>
      <Box>
        <SkipNavContent />
        <Text>Main content of the page</Text>
        <Box marginTop="spacing.2" />
        <Box gap="spacing.2" display="flex">
          <Button size="small">Button 1</Button>
          <Button size="small">Button 2</Button>
        </Box>
        <SkipNavContent id="second" />
        <Box marginTop="spacing.2" />
        <Text>Second Main content of the page</Text>
        <Box marginTop="spacing.2" />
        <Box gap="spacing.2" display="flex">
          <Button size="small">Button 3</Button>
          <Button size="small">Button 4</Button>
        </Box>
      </Box>
    </>
  );
};

export default SkipNavStoryMeta;
export const SkipNavExample = SkipNavTemplate.bind({});
