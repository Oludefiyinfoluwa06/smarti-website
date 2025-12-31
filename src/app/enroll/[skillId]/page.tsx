import { SkillsEnrollmentForm } from "@/components/pages/skills/SkillsEnrollmentForm";

interface EnrollParams {
  params: Promise<{
    skillId: string;
  }>;
}

const EnrollSkillPage = async ({ params }: EnrollParams) => {
  const { skillId } = await params;

  return <SkillsEnrollmentForm defaultSkill={skillId} />;
};

export default EnrollSkillPage;
