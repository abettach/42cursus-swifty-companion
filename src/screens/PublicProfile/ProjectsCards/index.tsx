import React from "react";
import { View, Text, ViewStyle } from "react-native";

interface IProjectsCardsProps {
  projects: any;
}

const ProjectsCards = (props: IProjectsCardsProps) => {
  const { projects } = props;

  return (
    <>
      {!projects.length && (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text>No projects found</Text>
        </View>
      )}
      {projects
        ?.filter((project) => !project.project.parent_id)
        ?.map((project, index) => {
          return (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: index === projects.length - 1 ? 20 : 0,
              }}
              key={Math.random() * 10}
            >
              <View
                style={[
                  PROJECT_CONTAINER_STYLE,
                  {
                    backgroundColor:
                      project.status === "finished" &&
                      project["validated?"] === true
                        ? "rgba(179, 255, 119, 0.4)"
                        : project.status === "in_progress"
                        ? "rgba(255, 255, 119, 0.4)"
                        : !project.validated
                        ? "rgba(255, 119, 119, 0.4)"
                        : "rgba(255, 255, 119, 0.4)",
                  },
                ]}
              >
                <Text style={{ flex: 9 }}>{project.project.name}</Text>
                <Text style={{ flex: 6 }}>{project.status}</Text>
                <Text style={{ flex: 1 }}>{project.final_mark}</Text>
              </View>
            </View>
          );
        })}
    </>
  );
};

export default ProjectsCards;

const PROJECT_CONTAINER_STYLE: ViewStyle = {
  width: "95%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  marginVertical: 5,
  height: 30,
};
