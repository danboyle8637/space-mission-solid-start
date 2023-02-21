import { styled } from "solid-styled-components";

import { MissionCardBanner } from "../../images/MissionCardBanner";

interface BannerImageProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  pointer-events: none;
`;

const Divider = styled.div`
  background-color: var(--accent-teal);
  width: 100%;
  height: 6px;
`;

export const BannerImage: React.FC<BannerImageProps> = ({
  imageUrl,
  altTag,
  titleTag,
}) => {
  return (
    <Container>
      <MissionCardBanner
        imageUrl={imageUrl}
        altTag={altTag}
        titleTag={titleTag}
      />
      <Divider />
    </Container>
  );
};
