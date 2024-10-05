import React from "react";
import { View, Text, Image, ViewStyle, TextStyle } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import Avatar from "@/components/atoms/Avatar";
import { ArrowIcon } from "@/components/atoms/icons";
import DefaultColitionCover from "@/assets/images/default-cover-image.jpg";
import DefaultProfileImage from "@/assets/images/default-profile-image.jpg";
import { IUserInformationItems } from "@/api/UserById";

interface IUserInformationsProps {
  data: IUserInformationItems;
  cursus: any;
  selectedCursus: any;
  setSelectedCursus: any;
}

const ColitionImage = (props) => {
  const { data } = props;

  return (
    <Image
      source={
        data?.[0]?.cover_url
          ? { uri: data?.[0]?.cover_url }
          : DefaultColitionCover
      }
      style={{
        flex: 1,
        objectFit: "cover",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

const addZero = (number) => {
  return number < 10 ? `${number}0` : `${number}`;
};

const UserInformations = (props: IUserInformationsProps) => {
  const { data, cursus, selectedCursus, setSelectedCursus } = props;

  const cursusElements = [
    {
      label: "Wallet",
      value: `${data?.wallet} ₳`,
    },
    {
      label: "Cursus",
      value: (
        <SelectDropdown
          data={cursus?.map((e) => ({
            title: e.cursus?.name,
          }))}
          showsVerticalScrollIndicator={false}
          onSelect={(selectedItem, index) => {
            setSelectedCursus(cursus[index]);
          }}
          renderButton={(selectedItem) => {
            return (
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {(selectedItem && selectedItem.title) ||
                    selectedCursus?.cursus?.name}
                </Text>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  padding: 10,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      ),
    },
    {
      label: "Evaluation points",
      value: `${data?.correction_point}`,
    },
    {
      label: "Grade",
      value: selectedCursus?.grade ? selectedCursus?.grade : "Novice",
    },
  ];

  const Level = selectedCursus?.level;
  const LevelPercent = `${Level}`?.split(".")[1]
    ? addZero(+`${Level}`?.split(".")[1])
    : 0;

  return (
    <View style={PUBLIC_PROFILE_USER_STYLE}>
      <ColitionImage data={data?.coalition} />

      <Avatar
        firstName={data?.displayname?.split(" ")?.[0]}
        lastName={data?.displayname?.split(" ")?.[1]}
        image={
          data?.image?.link ? { uri: data?.image?.link } : DefaultProfileImage
        }
        style={{ width: 125, height: 125, marginTop: 40 }}
      />

      <View style={NAME_CONTAINER_STYLE}>
        <Text style={FULLNAME_STYLE}>{data?.displayname}</Text>
        <Text style={LOGIN_STYLE}>{data?.login}</Text>
      </View>

      <View style={ELEMENT_CONTAINER_STYLE}>
        {cursusElements.map((element, index) => {
          return (
            <View style={ELEMENT_CHILD_CONTAINER_STYLE} key={index}>
              <Text
                style={[
                  ELEMENT_CHILD_TEXT_STYLE,
                  element.label === "Cursus" && { flex: 0 },
                ]}
              >
                {element.label}
              </Text>

              {element.label === "Cursus" ? (
                element.value
              ) : (
                <Text style={[ELEMENT_CHILD_TEXT_STYLE]}>{element.value}</Text>
              )}

              {element.label === "Cursus" && (
                <ArrowIcon
                  style={{
                    position: "absolute",
                    right: "5%",
                  }}
                  width={10}
                  height={100}
                />
              )}
            </View>
          );
        })}
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[ELEMENT_CHILD_TEXT_STYLE, { marginTop: 40, flex: 0 }]}>
          {data?.email}
        </Text>

        <View style={PROGRESSIVE_BAR_STYLE}>
          <View
            style={[
              PROGRESSIVE_BAR_CHILD_STYLE,
              { width: `${+LevelPercent}%` },
            ]}
          />
          <Text style={[LEVEL_TEXT_STYLE]}>{`${Level} %`}</Text>
        </View>

        <Text
          style={[
            ELEMENT_CHILD_TEXT_STYLE,
            { marginTop: 25, fontSize: 14, flex: 0 },
          ]}
        >
          {data?.campus?.[0]?.city}
        </Text>
      </View>
    </View>
  );
};

export default UserInformations;

const PUBLIC_PROFILE_USER_STYLE: ViewStyle = {
  width: "100%",
  height: 470,
  backgroundColor: "blue",
  alignItems: "center",
};

const NAME_CONTAINER_STYLE: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 5,
};

const FULLNAME_STYLE: TextStyle = { color: "white", fontWeight: 700 };

const LOGIN_STYLE: TextStyle = { color: "white", fontWeight: 600 };

const ELEMENT_CONTAINER_STYLE: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
};

const ELEMENT_CHILD_CONTAINER_STYLE: ViewStyle = {
  backgroundColor: "rgba(69, 69, 69, 0.8)",
  width: "60%",
  height: 25,
  alignItems: "center",
  paddingLeft: 20,
  flexDirection: "row",
  borderRadius: 5,
  marginBottom: 5,
};

const ELEMENT_CHILD_TEXT_STYLE: TextStyle = {
  color: "white",
  fontWeight: 600,
  fontSize: 12,
  marginRight: 20,
  flex: 1,
};

const PROGRESSIVE_BAR_STYLE: ViewStyle = {
  width: "80%",
  backgroundColor: "white",
  borderRadius: 1000,
  height: 20,
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
};

const PROGRESSIVE_BAR_CHILD_STYLE: ViewStyle = {
  height: "100%",
  backgroundColor: "#694BFD",
  borderTopLeftRadius: 1000,
  borderBottomLeftRadius: 1000,
  position: "absolute",
  left: 0,
};

const LEVEL_TEXT_STYLE: TextStyle = {
  color: "black",
  fontWeight: 700,
  fontSize: 14,
};
