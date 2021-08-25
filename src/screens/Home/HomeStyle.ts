import styled from 'styled-components/native';
import { Colors } from '../../styles/Colors';
import { Platform, StatusBar } from 'react-native';
const { primary, darkLight, dark } = Colors;

export const HomeContainer = styled.SafeAreaView`
    flex: 1;
    ${
        Platform.OS === 'android' ? `paddingTop: ${StatusBar.currentHeight}px` : ''
    }
    backgroundColor: ${primary};
    alignItems: center;
`;

export const SubContainer = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    width: 90%;
`;

export const DisplayPic = styled.Image`
    width: 90px;
    height: 90px;
    backgroundColor: ${darkLight};
    borderRadius: 10px;
    marginBottom: 15px;
`;

export const MainTitle = styled.Text`
    fontSize: 30px;
    fontWeight: bold;
    color: ${dark};
    textAlign: center;
`;

export const SubTitle = styled.Text`
    fontSize: 20px;
    color: ${dark};
    textAlign: center;
    marginTop: 10px;
`;

export const SubmitBtn = styled.TouchableOpacity`
    backgroundColor: ${dark}
    borderRadius: 5px;
    height: 52px;
    width: 100%;
    alignItems: center;
    justifyContent: center;
    marginTop: 20px;
`;

export const SubmitBtnText = styled.Text`
    fontSize: 20px;
    color: ${primary};
    padding: 15px;
`;