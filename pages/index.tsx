import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { Swipe } from ".prisma/client";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  SimpleGrid,
  VStack,
  TagLabel,
  Tag,
  HStack,
  Divider,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

type Props = {
  feed: Swipe[];
};

const Blog: React.FC<Props> = () => {
  const tags = [
    "openers",
    "closers",
    "hooks",
    "hero",
    "transitions",
    "value-props",
    "signup",
    "twitter",
    "first-lines",
  ];

  const [feed, setFeed] = useState([]);
  const [filter, setFilter] = useState("openers");

  const toast = useToast();

  useEffect(() => {
    fetch(`api/feed/${filter}`)
      .then((res) => res.json())
      .then((data) => {
        setFeed(data);
      });
  }, [filter]);

  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  return (
    <section>
      <>
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 2, md: 4 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={700}
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              lineHeight={"110%"}
            >
              Marketing inspiration for <br />
              <Text as={"span"} color={"purple.400"}>
                non-marketers
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize="lg">
              Most marketers have trouble coming up with copy for newsletters,
              ads, any creative work that will produce revenue. We have put
              together a hand picked list of copywriting swipe files that have
              worked for other brands.
            </Text>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Button
                colorScheme={"purple"}
                bg={"purple.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "purple.500",
                }}
              >
                Get Started
              </Button>
              <Button variant={"link"} colorScheme={"purple"} size={"sm"}>
                Learn more
              </Button>
            </Stack>

            <Box pt={10}>
              <Divider />
              <Wrap spacing={4} mt={4}>
                {tags.map((tag) => {
                  const formattedTag: string = tag.replace(/^\w/, (c) =>
                    c.toUpperCase()
                  );

                  return (
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme={filter === tag ? "purple" : "gray"}
                      onClick={() => {
                        setFilter(tag);
                      }}
                      cursor="pointer"
                    >
                      <TagLabel>{formattedTag}</TagLabel>
                    </Tag>
                  );
                })}
              </Wrap>

              <SimpleGrid columns={2} spacing={10} mt={6}>
                {feed.map((post) => {
                  return (
                    <VStack>
                      <Box
                        as="article"
                        maxW="sm"
                        p="5"
                        borderWidth="1px"
                        rounded="md"
                        cursor="pointer"
                        onClick={() => {
                          copyTextToClipboard(post.text).then(() => {
                            toast({
                              title: "Success!",
                              description: "Copied to clipboard",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          });
                        }}
                      >
                        <Text>{post.text}</Text>
                        <Divider my={2} />
                        <Text fontSize="sm" color="gray.400">
                          Copy to clipboard
                        </Text>
                      </Box>

                      {/* 
                      <Box bg="gray.100" padding={4} rounded="lg" shadow="sm">
                        <Text color="gray.800">{post.text}</Text>
                      </Box>
                      <Text fontSize="sm" color="gray.800">
                        Copy to clipboard
                      </Text> */}
                    </VStack>
                  );
                })}
              </SimpleGrid>
            </Box>
          </Stack>
        </Container>
      </>
    </section>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch("http://localhost:3000/api/feed/openers");
//   const feed = await res.json();

//   console.log({ feed });
//   return {
//     props: { feed },
//   };
// };

export default Blog;
