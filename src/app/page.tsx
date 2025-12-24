"use client";

import BikeTheftList from "@/components/BikeTheftList";
import {
  PageContainer,
  Header,
  HeaderContent,
  Logo,
  Title,
  Subtitle,
  MainContent,
  Footer,
  FooterText,
} from "@/components/styled";
import { BikeIcon } from "@/components/Icons";

export default function Home() {
  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <BikeIcon />
          </Logo>
          <div>
            <Title>
              Munich <span>Bike Watch</span>
            </Title>
            <Subtitle>Police Stolen Bike Registry • Powered by BikeIndex API</Subtitle>
          </div>
        </HeaderContent>
      </Header>

      <MainContent>
        <BikeTheftList />
      </MainContent>

      <Footer>
        <FooterText>
          Data provided by{" "}
          <a href="https://bikeindex.org" target="_blank" rel="noopener noreferrer">
            BikeIndex.org
          </a>{" "}
          • Built for Munich Police Department
        </FooterText>
      </Footer>
    </PageContainer>
  );
}
