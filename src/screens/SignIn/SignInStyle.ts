import styled from 'styled-components/native';
import { Colors } from '../../styles/Colors';
import { Platform } from 'react-native';
const { primary, tertiary, darkLight, dark, red } = Colors;

export const MainContainer = styled.KeyboardAvoidingView`
    flex: 1;
    backgroundColor: ${primary};
    alignItems: center;
`;

export const SubContainer = styled.View`
    flex: 1;
    width: 90%;
    alignItems: center;
    justifyContent: center;
`;

export const MainTitle = styled.Text`
    fontSize: 30px;
    fontWeight: bold;
    color: ${dark};
`;

export const SubTitle = styled.Text`
    fontSize: 20px;
    color: ${darkLight};
    margin: 10px 0 20px 0;
`;

export const InputBg = styled.View`
    backgroundColor: ${primary};
    border: 1.5px solid transparent;
    borderRadius: 5px;
    ${(p: { focused: boolean | null | undefined }) => p.focused ? `border-color: ${dark}` : `border-color: ${darkLight}`};
    height: 50px;
    width: 100%;
    alignItems: center;
    flexDirection: row;
    justifyContent: center;
    marginTop: 30px;
`;

export const InputLabel = styled.Text`
    fontSize: 18px;
    color: ${darkLight};
    position: absolute;
    left: 5%;
    top: -40%;
    backgroundColor: ${primary};
    padding: 5px;
    ${(p: { focused: boolean | null | undefined }) => p.focused ? `opacity: 1` : `opacity: 0`
    }
`;

export const InputIcon = styled.TouchableOpacity`
    position: absolute;
    right: 4%;
`;

export const Input = styled.TextInput`
    height: 50px;
    width: 95%;
    border: none;
    margin: 10px;
    padding: 0 10px;
    fontSize: 20px;
    color: ${tertiary};
`;

export const ForgotPassword = styled.Text`
    fontSize: 16px;
    color: ${dark};
    marginTop: 5px;
    marginLeft: auto;
    fontWeight: ${Platform.OS === 'ios' ? '500' : 'bold'};
`;

export const SubmitBtn = styled.TouchableOpacity`
    ${
        (p: { filled: boolean | null | undefined, isLogin: boolean }) => `
            ${
                p.isLogin ? `marginTop: 20px` : `marginTop: 30px`
            }

            ${
                p.filled ? `backgroundColor: ${dark} ` : `backgroundColor: ${darkLight}`
            }
            
        `
    }
    borderRadius: 5px;
    height: 52px;
    width: 100%;
    alignItems: center;
    justifyContent: center;
`;

export const SubmitBtnText = styled.Text`
    fontSize: 20px;
    color: ${primary};
    padding: 15px;
`;

export const BottomText = styled.Text`
    fontSize: 18px;
    ${(p: { link?: boolean }) => p.link
        ? `
            color: ${dark}
            fontWeight: ${Platform.OS === 'ios' ? '500' : 'bold'};
            textDecoration: underline
        `
        : `color: ${darkLight}`
    }
    textAlign: center;
    marginTop: 30px;
`;

export const ErrorMessage = styled.Text`
    fontSize: 16px;
    color: ${red};

    ${
        (p: { isLogin: boolean }) => p.isLogin 
        ? `marginTop: 5px;
            marginBottom: -5px;` 
        : `marginTop: 15px;
            marginBottom: -15px;
        `
    }
    marginRight: auto;
`;

export const Line = styled.View`
    height: 1px;
    backgroundColor: ${darkLight};
    marginTop: 20px;    
    width: 100%;
`;

export const SocialAuthLogo = styled.Image`
    width: 45px;
    height: 45px;
`;

export const SocialAuthContainer = styled.View`
    width: 100%;
    marginTop: 20px;
    alignItems: center;
    justifyContent: center;
    flexDirection: row;
`;

export const SocialAuthBtn = styled.TouchableOpacity`
    margin: 10px;
`;