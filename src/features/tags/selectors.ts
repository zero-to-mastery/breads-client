import { NAME } from "./constants";
import { Tag } from "./types";

// does created_at get updated whenever a row is updated in mysql?
export const getMostRecentTagIds = (
  state: any,
  list: string
): number[] | undefined => {
  // give time for tags to load
  if (state.tagsByList[`${list}`] && state.tagsByList[`${list}`].items) {
    let tagIdArray = state.tagsByList[`${list}`].items.map(
      (id: number) => state[NAME][id]
    );

    let tagIds = tagIdArray
      .sort((a: Tag, b: Tag) => {
        if (a.date > b.date) return 1;
        else return -1;
      })
      .map((tag: Tag) => state[NAME][tag.id].id)
      .reverse()
      .slice(0, 10);

    return tagIds;
  }
};

//so you pick off the pairs from state here, which has already been fetched in actions and reducer
// export const getPairedTagsIds = (
//   state: any,
//   list: string
// ): number[] | undefined => {

// }

export const getTopTagsIds = (
  state: any,
  list: string
): number[] | undefined => {
  // give time for tags to load
  if (state.tagsByList[`${list}`] && state.tagsByList[`${list}`].items) {
    let tagIdArray = state.tagsByList[`${list}`].items.map(
      (id: number) => state[NAME][id]
      //console.log(state[NAME][id])
    );

    let tagIds = tagIdArray
      .sort((a: Tag, b: Tag) => b.count - a.count)
      .map((tag: Tag) => state[NAME][tag.id].id)
      .slice(0, 10);

    return tagIds;
  }
};

export const getTagById = (state: any, id: number): Tag => {
  return state[NAME][id];
};

export const getUserMostRecentTagIds = (
  state: any,
  user_id: string
): number[] | undefined => {
  // give time for tags to load
  if (state && state[NAME]) {
    let tagIds = Object.values<Tag>(state[NAME])
      .filter((tag) => tag.user_id.includes(user_id))
      .sort((a, b) => {
        if (a.date > b.date) return 1;
        else return -1;
      })
      .map((tag: Tag) => state[NAME][tag.id].id);
    // .reverse()
    // .slice(0, 10);
    return tagIds;
  }
};

export const getUserTopTags = (
  state: any,
  user_id: string
): number[] | undefined => {
  if (state[NAME]) {
    let tagIds = Object.values<Tag>(state[NAME])
      .filter((tag) => tag.user_id.includes(user_id))
      .sort((a, b) => b.count - a.count)
      .map((tag) => state[NAME][tag.id].id)
      .slice(0, 10);
    return tagIds;
  }
};

export const getPairedTags = (state: any, id: number): number[] | undefined => {
  //select all readings
  let globalTags = state.readings;

  //convert to array of objs
  let newarr = Object.values(globalTags);

  //find matches with selected id in readings tags
  let arrs: number[];
  let id_matches: number[] = [];

  for (var i = 0; i < newarr.length; i++) {
    let k = Object.values(newarr[i]);

    arrs = k[10];
    if (arrs) {
      for (var y = 0; y < arrs.length; y++) {
        if (arrs[y] === id) {
          id_matches.push(arrs);
        }
      }
    }
  }

  //flatten 2D arrays
  let flattenedArray: number[] = [].concat.apply([], id_matches);
  //remove the original
  flattenedArray = flattenedArray.filter((number) => number !== id);
  //remove repeats
  let finalArray: number[] = flattenedArray.filter((item, pos) => {
    return flattenedArray.indexOf(item) == pos;
  });

  return finalArray;
};

// console.log('flattenedArray ' + flattenedArray1);

//convert tag numbers to tag names
// let tagNames1 = state.tags
// if(tagNames1) {
// console.log('1 ' + tagNames1);
// }

// let tagNames2 = Object.values(tagNames1)

// let finalArray: number[] = [];

//get tag numbers
// console.log('1 ' + tagNames1);
// console.log('2 ' + tagNames2);
//  flattenedArray1.forEach((p) => {
//    for(let a = 0; a < tagNames2.length; a++) {
//      let numbers = tagNames2[a].id;
//      //console.log(numbers);
//      // let name = tagNames2[a].tag_name

//        if(numbers == p) {
//          finalArray.push(numbers);
//      }
//    }
//   })
// console.log('final ' + finalArray);
