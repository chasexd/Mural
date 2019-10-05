import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  Form,
  FormGroup,
  Fieldset,
  Legend,
  Label,
  FormText,
  Container,
  Col,
  Row,
  Button,
  ButtonGroup,
} from '@bootstrap-styled/v4';
import Frame from 'react-styled-frame';

// eslint-disable-next-line import/no-webpack-loader-syntax
import draftCSS from '!!raw-loader!../client/styles.scss';

import BasicField from './bites/BasicField';
import MediaPreviewField from './bites/MediaPreviewField';
import NavEntry from './bites/NavEntry';
import ImageParallaxDraft from './preview/ImageParallaxDraft';

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const Editor = styled.div`
  overflow: auto;
  height: 100vh;
`;

function ImageParallaxForm(props) {
  const { draftItem, onSave } = props;
  return (
    <Container className="m-0 p-0" fluid>
      <Row>
        <Col xs={8}>
          <Editor>
            <Form>
              <NavEntry />
              <Fieldset>
                <Legend>Item Content</Legend>
                <FormGroup>
                  <Label>Title</Label>
                  <BasicField
                    onChange={content => {
                      draftItem.changeTitle(content);
                    }}
                    value={draftItem.title}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Headline</Label>
                  <BasicField
                    onChange={content => {
                      draftItem.changeSubtitle(content);
                    }}
                    value={draftItem.subtitle}
                  />
                </FormGroup>
              </Fieldset>
              <Fieldset>
                <FormGroup>
                  <Label>Background Image</Label>
                  <MediaPreviewField
                    media={draftItem.image}
                    onUpdate={(path, name) => {
                      draftItem.image.uploadFile(path, name);
                    }}
                    acceptedMimeTypes={[
                      'image/jpeg',
                      'image/png',
                      'image/webp',
                    ]}
                  >
                    {({ preview }) => (
                      <>
                        <Img
                          src={preview}
                          alt="Feature image preview"
                        />
                        <FormText color="muted">
                          Feature Image
                        </FormText>
                      </>
                    )}
                  </MediaPreviewField>
                  {draftItem.image.renditions.map(rendition => (
                    <div
                      key={`${rendition.w}x${rendition.h}x${rendition.scale}`}
                    >
                      <div>{`${rendition.w}x${rendition.h} scale ${rendition.scale}`}</div>
                      <Img
                        src={rendition.thumborUrl}
                        alt={`${rendition.w}x${rendition.h}`}
                      />
                    </div>
                  ))}
                </FormGroup>
              </Fieldset>
              <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button color="secondary">Reset</Button>
                <Button color="primary" onClick={onSave}>
                  Save
                </Button>
              </ButtonGroup>
            </Form>
          </Editor>
        </Col>
        <Col xs={4} className="p-0">
          <StoryPreview head={<style>{draftCSS}</style>}>
            <>
              <article>
                <ImageParallaxDraft item={draftItem} />
              </article>
            </>
          </StoryPreview>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ImageParallaxForm);
