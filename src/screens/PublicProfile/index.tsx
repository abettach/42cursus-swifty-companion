import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, ViewStyle } from "react-native";

import UserInformations from "./UserInformations";
import SplitComponent from "./SplitComponent";
import ProjectsCards from "./ProjectsCards";
import SkillsInfomration from "./Skills";
import userByIdQuery, { IUserInformationItems } from "@/api/UserById";
import userCoalitionById from "@/api/Coalition";

interface IPublicProfileProps {
  route: {
    params: {
      userId: string;
    };
  };
}

const PublicProfile = (props: IPublicProfileProps) => {
  const { userId } = props.route.params;

  const [userInformation, setUserInformation] =
    useState<IUserInformationItems | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [cursus, setCursus] = useState(null);
  const [selectedCursus, setSelectedCursus] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setCursus(userInformation?.cursus_users);
      setSelectedCursus(
        userInformation?.cursus_users?.[
          userInformation?.cursus_users?.length - 1
        ]
      );
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      setIsLoading(true);
      try {
        const response = await userByIdQuery({
          id: userId,
        });
        const { status, data: _data } = response;
        if (status === 1) setUserInformation(_data);
        else setUserInformation(null);

        const colitionsInformation = await userCoalitionById({ id: _data?.id });
        const { status: colitionStatus, data: colitionData } =
          colitionsInformation;
        if (colitionStatus === 1)
          setUserInformation({ ..._data, coalition: colitionData });
        else setUserInformation(_data);
      } catch (error) {}
      setIsLoading(false);
    };

    fetchUserInformation();
  }, [userId]);

  interface ILoadingCompoenentProps {
    height?: number;
  }

  const LoadingComponent = (props: ILoadingCompoenentProps) => {
    const { height } = props;

    return (
      <View style={[LOADING_COMPOENENT_CONTAINER, { height: height ?? 50 }]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  return (
    <View style={PUBLIC_PROFILE_CONTAINER}>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        {/* //Information related to the user */}
        {!isLoading && userInformation ? (
          <UserInformations
            data={userInformation}
            cursus={cursus ?? []}
            selectedCursus={selectedCursus ?? {}}
            setSelectedCursus={setSelectedCursus}
          />
        ) : (
          <LoadingComponent height={450} />
        )}

        <SplitComponent title={"Projects"} />

        {/* //Information related to the projects */}
        {!isLoading && selectedCursus && userInformation && (
          <ProjectsCards
            projects={userInformation?.projects_users
              ?.filter((el) => el?.cursus_ids?.[0] === selectedCursus.cursus_id)
              ?.filter(
                (project: { status: string }) =>
                  project.status === "finished" ||
                  project.status === "in_progress" ||
                  project.status === "failed"
              )}
          />
        )}

        {isLoading && <LoadingComponent />}
        <View
          style={{
            height: 20,
          }}
        />

        <SplitComponent title={"Skills"} />

        {/* // Information related to the skills */}
        {!isLoading && selectedCursus && (
          <SkillsInfomration
            skills={userInformation.cursus_users.filter(
              (cursus) => cursus.cursus.id === selectedCursus.cursus_id
            )}
          />
        )}
        {isLoading && <LoadingComponent />}
      </ScrollView>
    </View>
  );
};

export default PublicProfile;

const PUBLIC_PROFILE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "center",
};

const LOADING_COMPOENENT_CONTAINER: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
};
