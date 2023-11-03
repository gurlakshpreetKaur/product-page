"use client"

import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductInterface from "../(utils)/productInterface";
import { ProductGrid } from "./ProductComponents";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaSun, FaWater } from "react-icons/fa";
import KEY from "../(utils)/APIKey";


const StyledSection = styled.section`
    --p-y: 4rem;
    --p-x: 2rem;

    padding: var(--p-y) var(--p-x);
    background-color: white;
    height: auto;
`;

export default function Section({ children, title }: { children: any, title: string }) {
    return (<StyledSection aria-label={`${title} section`}>
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3 }}
            variants={{
                visible: { opacity: 1, marginBottom: "1.6rem" },
                hidden: { opacity: 0 }
            }}><h2>{title}</h2>
        </motion.div>
        {children}
    </StyledSection>)
}

const PaginationDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2rem 0px;

    span {
        font-family: ${props => props.theme.fonts.brand};
        font-size: 1rem;
        color: black;
        margin: 0rem 0.5rem;
        display: inline-block;
        cursor: pointer;
        transition: 0.5s all;

        &:hover {
            color: ${props => props.theme.colors.brand[2]}
        }
    }
`;

const SortingOption = styled.span<{ active?: boolean }>`
    // font-family: ${props => props.theme.fonts.brand};
    font-size: 1rem;
    color: black;
    margin: 0rem 0.5rem;
    display: inline-block;
    cursor: pointer;
    transition: 0.5s all;
    font-weight: bold;
    color: ${props => props.active ? props.theme.colors.brand[2] : props.theme.colors.brand[1]};

    &:hover {
        color: ${props => props.theme.colors.brand[2]};
    }
`;

function SectionWithProductsUnstyled({ title }: { title: string }) {
    const [response, setResponse] = useState<ProductInterface[] | false>([]);
    const [page, setPage] = useState(1);

    const [sortingByPrice, setSortingByPrice] = useState(false);
    const [sortingAlphabetically, setSortingAlphabetically] = useState(false);
    const [filteringLessSun, setFilteringLessSun] = useState(false);
    const [filteringLessWater, setFilteringLessWater] = useState(false);

    function handlePagination(page: number) {
        setPage(page);
    }

    const Request = async (page: number) => {
        try {
            document.body.style.cursor = "progress";
            const { data: { data } } = await axios.get(`https://perenual.com/api/species-list?key=${KEY}&page=${page}`,
                {});
            console.log(data);
            const formattedData: ProductInterface[] = data.map((i: any) => ({
                commonName: i.common_name,
                scientificName: i.scientific_name[0], //scientific name will be used as description
                description: `The ${i.common_name.toLowerCase()} is a ${i.cycle.toLowerCase()} plant, whose scientific name is ${i.scientific_name}. It needs ${i.watering.toLowerCase()} water and ${i.sunlight[0].toLowerCase()} sunlight.`,
                sunlight: i.sunlight.map((i: string) => i.toLowerCase()),
                watering: i.watering.toLowerCase(),
                cycle: i.cycle.toLowerCase(),
                price: i.common_name.length * 10, //this is a deterministic way of getting the price, so that sorting
                //  is consistent in its results
                image: (i.default_image === null ? "https://www.hill-interiors.com/images/giant/20132.jpg" : i.default_image.regular_url)
            }));
            console.log(formattedData);
            setResponse(formattedData);
            document.body.style.cursor = "default";
            window.scroll({ left: 0, top: window.innerHeight - 100, behavior: 'smooth' });
        } catch (error) {
            console.error("Error occured:", error);
            setResponse(false);
            document.body.style.cursor = "regular";
        }
    };

    useEffect(() => {
        (async () => {
            return await Request(page);
        })().then(() => { });
    }, [page]);

    return <Section title={title}>
        <span style={{ marginBottom: "1rem", display: "inline-block", marginLeft: "0.5rem" }}>
            <SortingOption title="Sort alphabetically" active={sortingAlphabetically}
                onClick={() => setResponse(prev => prev !== false && [...prev].sort())}>A-Z</SortingOption>
            <SortingOption title="Sort based on price" active={sortingByPrice}
                onClick={() => setResponse(prev => prev !== false && [...prev].sort((a, b) => a.price - b.price))}>₹</SortingOption>
            <SortingOption title="Filter: plants that need less sun" active={filteringLessSun} onClick={() => {
                if (filteringLessSun) {
                    (async () => {
                        return await Request(page); //get previous unfiltered data of same page
                    })().then(() => {
                        setFilteringLessSun(false);
                    });

                } else {
                    setResponse(response => response !== false && response.filter(i => !i.sunlight.includes("Full sun")));
                    setFilteringLessWater(true);
                }
            }}>
                Less sun</SortingOption>
            <SortingOption title="Filter: plants that need less water" active={filteringLessWater}
                onClick={() => {
                    if (filteringLessSun) {
                        (async () => {
                            return await Request(page); //get previous unfiltered data of same page
                        })().then(() => {
                            setFilteringLessWater(false);
                        });

                    } else {
                        setResponse(response => (response !== false) &&
                            [...response].filter(i => i.watering.toLowerCase() !== "frequent"));
                        setFilteringLessWater(true);
                    }
                }}>
                Less water</SortingOption>
        </span>
        {typeof response === "object" && <ProductGrid products={response} />}
        <PaginationDiv>
            <span onClick={() => page > 1 && handlePagination(page - 1)}><AiOutlineLeft /></span>
            <span onClick={() => handlePagination(1)} style={page === 1 ? { color: "#7BA05B" } : {}}>1</span>
            <span onClick={() => handlePagination(2)} style={page === 2 ? { color: "#7BA05B" } : {}}>2</span>
            <span onClick={() => handlePagination(3)} style={page === 3 ? { color: "#7BA05B" } : {}}>3</span>
            <span onClick={() => handlePagination(4)} style={page === 4 ? { color: "#7BA05B" } : {}}>4</span>
            <span onClick={() => handlePagination(5)} style={page === 5 ? { color: "#7BA05B" } : {}}>5</span>
            <span onClick={() => page < 5 && handlePagination(page + 1)}><AiOutlineRight /></span>
        </PaginationDiv>
    </Section>
}

export const SectionWithProducts = styled(SectionWithProductsUnstyled)`
    min-height: 300vh;
`