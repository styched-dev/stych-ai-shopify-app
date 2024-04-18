import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  FormLayout,
  TextField,
  InlineGrid,
  LegacyCard,
  SkeletonTabs,
  Grid
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }],
        },
      },
    },
  );
  const responseJson = await response.json();

  return json({
    product: responseJson.data?.productCreate?.product,
  });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const productId = actionData?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId]);
  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <ui-title-bar title="The Future of Apparel Manufacturing">
        {/* <button variant="primary" onClick={generateProduct}>
          Join the waitlist
        </button> */}
        <button url="https://stych.ai/brand/register.php" target="_blank" variant="primary" >Join the waitlist</button>
      </ui-title-bar>

      <BlockStack gap="500">
        <Layout>
       
          <Layout.Section>
            <Card>
              <Button url="https://stych.ai/brand/register.php" target="_blank" variant="primary" >Join the waitlist</Button>
              <img
                src="https://stych.ai/assets/slides/hero1.png"
                style={{ width: "100%" }}
              />
              <Text as="h1" variant="headingXl">On-Demand Revolution</Text>
              <Text>
                Introducing the all-in-one SaaS platform that connects to any
                ecommerce store, syncs orders, manages end to end manufacturing
                of apparel and procurement of raw materials, on demand, as per
                incoming orders without any minimum order quantity constraints,
                manages shipping, NDR and RTO management, Customer care and
                warehousing of returned orders without any fixed costs! So you
                can focus on getting more orders and growing your business,
                while we take care of the rest.
              </Text>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <img
                src="https://stych.ai/assets/slides/features.png"
                style={{ width: "100%" }}
              />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <img
                src="https://stych.ai/assets/slides/nirvana.png"
                style={{ width: "100%" }}
              />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
              <Text>
                    Our platform is the perfect solution for businesses of all
                    sizes. It is easy to use and affordable. There are no fixed
                    costs, and you only pay for the orders we process for your
                    brand. The future of apparel manufacturing and order
                    fulfilment is on-demand. The future of fashion is <b>Stych.ai</b>
                  </Text>
                <BlockStack gap="200">
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Sales" sectioned>
                      <Text as="h2" variant="headingSm">Auto Order Flow</Text>
                        <img
                        src="https://stych.ai/start/img/pricing/automated-order-flow.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Orders" sectioned>
                      <Text as="h2" variant="headingSm">Procurement</Text>
                      <img
                        src="https://stych.ai/start/img/pricing/raw-material-procurement.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Orders" sectioned>
                      <Text as="h2" variant="headingSm">Manufacturing</Text>
                      <img
                        src="https://stych.ai/start/img/pricing/manufacturing.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Orders" sectioned>
                      <Text as="h2" variant="headingSm">Packaging & Shipping</Text>
                      <img
                        src="https://stych.ai/start/img/pricing/packaging-shipping.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Sales" sectioned>
                      <Text as="h2" variant="headingSm">RTO Management</Text>
                        <img
                        src="https://stych.ai/start/img/pricing/rto-management.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Orders" sectioned>
                      <Text as="h2" variant="headingSm">Warehousing</Text>
                      <img
                        src="https://stych.ai/start/img/pricing/return-management-warehousing.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Orders" sectioned>
                      <Text as="h2" variant="headingSm">CRM Marketing</Text>
                      <img
                        src="https://stych.ai/start/img/pricing/email-sms-whatsapp-marketing.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <Card title="Orders" sectioned>
                      <Text as="h2" variant="headingSm">Customer Acquisiiton</Text>
                      <img
                        src="https://stych.ai/start/img/pricing/custom-acquisition.png"
                        style={{ width: "100%" }}
                      />
                      </Card>
                    </Grid.Cell>
                  </Grid>
                </BlockStack>
                
                {actionData?.product && (
                  <Box
                    padding="400"
                    background="bg-surface-active"
                    borderWidth="025"
                    borderRadius="200"
                    borderColor="border"
                    overflowX="scroll"
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{JSON.stringify(actionData.product, null, 2)}</code>
                    </pre>
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
