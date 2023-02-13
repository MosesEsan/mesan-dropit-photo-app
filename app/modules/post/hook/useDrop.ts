import {useEffect, useMemo, useState} from "react";
import {useMutation} from "@apollo/client";
import {LIKE_DROP} from "../PostService";
import {Alert} from "react-native";
import {usePost} from "../PostProvider";

export default function useDrop(item: {
    taggedUsers: string[];
    in_range: boolean;
    comments: string[];
    likes: any;
    id: number;
}, userId: number, crudeHelper: undefined) {
    //0 - DECLARE PROVIDERS VARIABLES
    // const {updateData} = usePost();

    //==========================================================================================
    //1 - DECLARE VARIABLES
    const [likes, setLikes] = useState(item.likes);
    const [comments, setComments] = useState(item.comments);
    const [inRange, setInRange] = useState(item.in_range);

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        setLikes(item.likes)
        setComments(item.comments)
        setInRange(item.in_range)
    }, [item]);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [likeDrop] = useMutation(LIKE_DROP, {fetchPolicy: 'network-only', onError});

    function onError(error: { message: string; }) {
        // undo the changes made to the likes array
        Alert.alert(error.message)
        // @ts-ignore
        setLike(!isLiked)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const setLike = (val: boolean, callback: Function) => {
        let [...clone] = likes;
        if (val) clone.push({userId})
        else if (!val) clone = clone.filter((obj: any) => obj.userId.toString() !== userId.toString());

        setLikes(clone)

        //Update the data in the content/state
        // updateData(item.id, {likes: clone})

        // @ts-ignore
        if (callback) callback(item.id, {likes: clone})

    }

    const onDropLike = async (callback=null) => {
        // @ts-ignore
        setLike(!isLiked, callback)
        setTimeout(async () => {
            await likeDrop({variables: {dropId: item.id, value: !isLiked}});
        }, 200)
    }

    const isLiked = useMemo(() => {
        return likes.some((like: any) => like.userId === userId);
    }, [likes])

    const taggedUsers = useMemo(() => {
        return item.taggedUsers || []
    }, [item])

    return [likes, isLiked, onDropLike, comments, inRange, taggedUsers];
}
