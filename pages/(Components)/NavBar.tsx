import styled, { css } from 'styled-components';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Link from 'next/link';

const StyledNav = styled.nav`
    --p-y: 0.75rem;
    --p-x: 2rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: var(--p-y) var(--p-x);
    width: calc(100vw - 2*var(--p-x)); //maintaining same width (100%) by subtracting the x-padding
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index:500;
    background-color: ${props => props.theme.semanticColors.navBarBg};
`;

const NavListItem = styled.li<{ currentlyon?: string }>`
        margin: 0px 0.6rem 0px 0.6rem;
        display: inline-block;
        ${props => Boolean(props.currentlyon) ? css`color: ${props.theme.semanticColors.pageIcon.activeColor}`
        : `color: ${props.theme.semanticColors.pageIcon.inactiveColor}`};
        border-radius: 4px;
        padding: 5px;
        transition: all 0.4s;
        cursor: pointer;

        &:hover {
            background-color: ${props => props.theme.semanticColors.pageIcon.hoverBg};
        }

        & svg {
            ${props => Boolean(props.currentlyon) ? css`color: ${props.theme.semanticColors.pageIcon.activeColor}`
        : `color: ${props.theme.semanticColors.pageIcon.inactiveColor}`};
        }
`

const NavPartition = styled.div<{ left?: boolean }>`
    width: 50%;
    ${props => props.left ? css`text-align: left` : css`text-align:right`};

    ${props => !props.left ? " @media (max-width: 350px) { display: none }"
        : "@media (max-width: 350px) {width: 100%}"}
`;

const StyledNavLogo = styled.h1`
    font-family: ${props => props.theme.fonts.brand};
    font-size: 1.5rem;
    color: white;
    letter-spacing: 0.7px;
`

export default function NavBar() {
    return (<StyledNav>
        <NavPartition left>
            <StyledNavLogo>Planet Ella</StyledNavLogo>
        </NavPartition>

        <NavPartition>
            <ul>
                <NavListItem currentlyon="true">
                    <Link href="/" title="Products" role="navigation">
                        <AiOutlineShop aria-label='Navigate to Products' title="Products" />
                    </Link>
                </NavListItem>
                <NavListItem title="My Cart">
                    <a href="/cart" title="My Cart" role="navigation">
                        <AiOutlineShoppingCart aria-label='Navigate to My Cart' title="My Cart" />
                    </a>
                </NavListItem>
                <NavListItem title="My Account">
                    <a href="/user" title="My Account" role="navigation">
                        <AiOutlineUser className="cursor-pointer" aria-label='Navigate to My Account' title="My Account" />
                    </a>
                </NavListItem>
            </ul>
        </NavPartition>
    </StyledNav>);
}