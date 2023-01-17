import React, {useState, useEffect, useLayoutEffect, useMemo} from 'react';
import {SafeAreaView, View, StyleSheet, ActionSheetIOS, Alert} from 'react-native';

import {useLazyQuery, useMutation} from "@apollo/client";
import {EmptyView, ErrorView} from "me-helper-views";

import {useAuth} from "../../auth/AuthProvider";
import {useTheme} from "../../ThemeProvider";
import {useLocation} from "../../../components/location/LocationProvider";
import {GET_USER, FOLLOW_USER, BLOCK_USER} from "../UserService";

import {DIListView} from "../../../components/MeHelperViews";
import ProfileHeader from "../components/ProfileHeader";
import {RightNavButton} from "../../../components/DIHeader";
import CardContainer from "../../post/components/Card/CardContainer";
import Settings from "../../auth/scenes/Account/Settings";


export default function User({navigation, route}) {
    const params = route.params || {}

    //0 - DECLARE PROVIDERS VARIABLES
    const {backgroundColor} = useTheme()
    const {state: {currentLocation}} = useLocation();
    const {state: {isLoggedIn, currentUser}, handleLogout} = useAuth();

    //0 - GRAPHQL QUERIES AND MUTATIONS
    const [getUser, {refetch}] = useLazyQuery(GET_USER, {fetchPolicy: 'network-only', onCompleted, onError});
    const [followUser, {loading}] = useMutation(FOLLOW_USER, {onError});
    const [blockUser] = useMutation(BLOCK_USER, {onCompleted:onBlocked, onError:onBlockError});

    //==========================================================================================
    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false)

    const [data, setData] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
    const [user, setUser] = useState(params.user != null ? route.params.user : currentUser);

    //==================================================================================================
    //1B -NAVIGATION CONFIG
    useLayoutEffect(() => {
        let buttons = [
            {
                name: 'more-horizontal',
                size: 23,
                onPress: onMorePress,
                color: "#fff",
                type: "feather"
            }
        ];

        if (isLoggedIn && user && user.id === currentUser.id) {
            buttons.push({
                name: 'settings',
                size: 23,
                onPress: () => navigation.navigate('Account', {screen: "Settings"}),
                color: "#fff",
                type: "feather"
            })
        }

        navigation.setOptions({
            headerTitle: user.name,
            headerRight: () => {
                return <RightNavButton buttons={buttons}/>
            }
        })
    }, [navigation, user]);

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            if (!isLoggedIn) await handleLogout();
            else if (isLoggedIn) await getData()
        })();
    }, [isLoggedIn]);


    //2b - GET DATA
    async function getData(refresh = false) {
        const variables = {id: user.id}

        variables['latitude'] = currentLocation.latitude
        variables['longitude'] = currentLocation.longitude
        variables['radius'] = 2

        if (refresh) {
            setIsRefreshing(true)
            await refetch(variables)
        } else {
            setIsFetching(true)
            setData([])
            await getUser({variables})
        }
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(resp) {
        if (resp && resp.user) {
            const result = resp['user'];
            const user = result.user;

            const {...clone} = user;
            const drops = user.drops;
            const followers = user.followers;
            const following = user.following;
            const currentUserFollowing = result.following;

            setUser(clone)
            setData(drops)

            setFollowers(followers)
            setFollowing(following)
            setCurrentUserFollowing(currentUserFollowing)
        }

        setIsFetching(false)
        setIsRefreshing(false)
    }

    function onError(error) {
        setError(error.message)
        setIsFetching(false)
        setIsRefreshing(false)
    }

    async function onBlocked(data) {
        if (data.blockUser) {
            setIsBlocking(false)
            Alert.alert(
                "User Blocked",
                `You blocked ${user.name}`,
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );

        }
    }

    function onBlockError(error) {
        alert(error.message)
        setIsBlocking(false)
    }

    //==================================================================================================
    //4 - UI HANDLERS
    //4a - RENDER ITEM
    const renderItem = ({item, i: index}) => {
        return (
            <CardContainer item={item}
                           index={index}
                           navigation={navigation}
                           key={`USERDrop.${item.id}.drop`}
                           user={currentUser}
                           currentLocation={currentLocation}
                           inProfile={true}
                           onLike={onLike}
                           data={data}/>
        )
    };

    //RENDER EMPTY
    const renderEmpty = () => {
        return (
            <EmptyView title={"No Drops"}
                       message={"This user has not dropped anything. Follow to keep up to dat with the user."}/>
        )
    };

    //==================================================================================================
    //5 - ACTION HANDLERS
    const onPress = async () => {
        if (user.id === currentUser.id) {
            navigation.navigate('Account', {screen: "EditProfile"})
        } else {
            // setIsFollowing(!isFollowing)
            await followUser({variables: {userId: user.id, value: !isFollowing}});
        }
    }

    const onLike = (id, likes) => {
        let [...clone] = data;

        const index = clone.findIndex((obj) => obj.id === id);
        if (index !== -1) {
            clone[index]['likes'] = likes;
        }

        setData(clone)
    }

    const onMorePress = () => {
        let options = ["Cancel", "Map View"]

        if (isLoggedIn && user && user.id !== currentUser.id) {
            options.push("Block User")
        }

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options,
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            async buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    navigation.navigate('UserPosts', {user})
                } else if (buttonIndex === 2) {
                    setIsBlocking(true)
                    await blockUser({variables: {userId: user.id}});
                }
            }
        );
    }

    // ==========================================================================================
    const isFollowing = useMemo(() => {
        const followingUserIds = currentUserFollowing.map((follow) => follow.userId)
        return followingUserIds.includes(user.id.toString())
    }, [currentUserFollowing])

    const showEdit = useMemo(() => {
        if (user && currentUser) return currentUser.id === user.id

        return false;
    }, [isLoggedIn])

    // ==========================================================================================
    //6-  RENDER VIEW
    return (
        <SafeAreaView style={[{flex: 1, backgroundColor}]}>
            {
                user &&
                <DIListView
                    grid={true}
                    isLoggedIn={isLoggedIn}
                    isFetching={isFetching}
                    error={error}
                    onRetry={getData}
                    errorViewStyle={{backgroundColor}}
                    data={data}
                    extraData={data}
                    initialNumToRender={10}
                    showsVerticalScrollIndicator={false}
                    style={{backgroundColor}}
                    contentContainerStyle={{flexGrow: 1, backgroundColor}}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <ProfileHeader backgroundColor={backgroundColor}
                                       key={`user_profile${user['id'].toString()}`}
                                       user={user}
                                       drops={data}
                                       followers={followers}
                                       following={following}
                                       isFollowing={isFollowing}
                                       isFetching={isFetching}
                                       onPress={onPress}
                                       loading={loading}
                                       navigation={navigation}
                                       showEdit={showEdit}/>
                    }
                    ListEmptyComponent={renderEmpty}
                    keyExtractor={(item, index) => `item_${item['id'].toString()}${index.toString()}`}
                    refreshing={isRefreshing}
                    onRefresh={() => getData(true)}/>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({});
