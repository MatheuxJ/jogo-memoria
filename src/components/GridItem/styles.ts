import styled from "styled-components";

type ContainerProps ={
    showBackground: boolean;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground ? '#041736' : '#1e1e1f'};
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

type IconProps ={
    opacity?: number;
}

export const Icon = styled.img<IconProps>`
    width: 80px;
    height: 70px;
    opacity: ${props => props.opacity ?? 1};
`;