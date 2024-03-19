import { useFonts } from 'expo-font';

// Thay vì sử dụng FontFamily.poppins..., thì copy đoạn code sau vào ngay phía dưới khai báo và bên trong các component (xem HomeScreen.js để hiểu cách làm)
// Lưu ý, nhớ import { useFonts } from 'expo-font' trước 
const [fontsLoad] = useFonts({
    poppins_semibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    poppins_medium: require('../assets/fonts/Poppins-Medium.ttf'),
    poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
    poppins_black: require('../assets/fonts/Poppins-Black.ttf'),
    poppins_bold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppins_extrabold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    poppins_extralight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    poppins_regular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppins_thin: require('../assets/fonts/Poppins-Thin.ttf'),
});
