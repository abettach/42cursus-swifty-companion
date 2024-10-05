import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { Bar } from "react-native-progress";

interface ISkillsInformationProps {
  skills: any;
}

const SkillsInformation = (props: ISkillsInformationProps) => {
  const { skills } = props;

  return (
    <>
      {skills[0]?.skills.length === 0 && (
        <View style={SKILLS_CONTAINER_STYLE}>
          <Text>No skills found</Text>
        </View>
      )}
      {skills[0]?.skills.length > 0 && (
        <View style={SKILL_BAR_CONTAINER_STYLE}>
          {skills[0]?.skills.map((skill) => {
            return (
              <View style={SKILL_BAR_STYLE} key={skill?.name}>
                <Text style={{ maxWidth: 150 }}>{skill?.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bar progress={skill?.level / 20} width={200} height={10} />
                  <Text style={SKILLS_LEVEL_TEXT_STYLE}>{`${(
                    (skill?.level / 20) *
                    100
                  ).toFixed(1)}%`}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

export default SkillsInformation;

const SKILLS_CONTAINER_STYLE: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
};

const SKILL_BAR_CONTAINER_STYLE: ViewStyle = {
  marginBottom: 100,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
};

const SKILL_BAR_STYLE: ViewStyle = {
  width: "90%",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  marginBottom: 10,
};

const SKILLS_LEVEL_TEXT_STYLE: TextStyle = {
  marginLeft: 10,
  fontSize: 10,
  fontWeight: "700",
  color: "black",
  position: "absolute",
};
