import { styled } from "styled-components";
import { motion } from "framer-motion";
import ProductInterface from "../(utils)/productInterface";

const ProductDiv = styled(motion.div)`
    --p: 1.2rem;

    border-radius: 1rem;
    padding: var(--p);
    background: linear-gradient(45deg, ${props => props.theme.semanticColors.cardBgGradient.rest.join(", ")});
    text-align: center;
    transition: all 0.2s;
    transform-origin: center;
    height: calc(100%  - 2 * var(--p)); //this allows cards of the same row to fix max available space, so cards
    ////////////////////////////////    in same row take up same height
    positon: relative;
`;

const StyledImage = styled.img`
    border-radius: 0.9rem;
    object-fit: cover;
    aspect-ratio: 1;
    width: 100%;
    filter: none;
`

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 11px;
`;

const ProductName = styled.h3`
    color: ${props => props.theme.colors.primary[1]};
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 2px 0px;
`

const Description = styled.p`
    color: ${props => props.theme.colors.primary[2]};
    font-size: 0.75rem;
    display: -webkit-box;
    max-width: calc(100% - 1px);
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const CostSpace = styled.p`
    padding: 0.2rem 1.5rem;
    font-size: 0.7rem;
    display: inline-block;
    color: ${props => props.theme.colors.primary[2]}aa;
    font-weight: bold;
`

export function ProductCard({ commonName, scientificName, description, sunlight, watering, cycle, price, image }: ProductInterface) {
    return <ProductDiv whileHover={{
        scale: 1.01,
        background: `linear-gradient(45deg, #1B4D3Ecc, #1B4D3Edd, #1B4D3Eee)`,
    }} aria-label={`Product: ${commonName}`}>
        {/* ^^^ this framer div is for adding linear background change on hover,
    which isnt possible with regular CSS  */}
        <StyledImage src={image} alt={`image of ${commonName}`} />
        <CostSpace>₹{price}</CostSpace>
        <ProductName title={commonName}>{commonName}</ProductName>
        <Description title={description}>{description}</Description>
    </ProductDiv>;
}

export function ProductGrid({ products }: { products: ProductInterface[] }) {
    return <StyledGrid>
        {products.map((card, i) =>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                variants={{
                    visible: { opacity: 1, scale: 1, height: "100%" },
                    hidden: { opacity: 0, scale: 0 }
                }}>
                {/* ^^^ this framer div is for scroll into view effect  */}

                <motion.div key={i}
                    initial={{ opacity: 0, translateY: 60, scale: 0.8 }}
                    animate={{ opacity: 1, translateY: 0, scale: 1, height: "100%" }}
                    transition={{ duration: 0.4, delay: 0.1 }}>
                    {/* ^^^ this framer div is for initial effects, stagger effect  */}

                    <ProductCard {...card} />
                </motion.div>
            </motion.div>
        )}
    </StyledGrid>
}