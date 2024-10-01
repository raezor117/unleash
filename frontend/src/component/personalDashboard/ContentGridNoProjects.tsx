import { Grid, Typography, styled } from '@mui/material';
import { AvatarGroupFromOwners } from 'component/common/AvatarGroupFromOwners/AvatarGroupFromOwners';
import { UserAvatar } from 'component/common/UserAvatar/UserAvatar';
import type { PersonalDashboardSchemaAdminsItem } from 'openapi/models/personalDashboardSchemaAdminsItem';
import type { PersonalDashboardSchemaProjectOwnersItem } from 'openapi/models/personalDashboardSchemaProjectOwnersItem';
import { Link } from 'react-router-dom';

const ContentGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.shape.borderRadiusLarge}px`,
}));

const SpacedGridItem = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(4),
    border: `0.5px solid ${theme.palette.divider}`,
}));

const TitleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'center',
    fontSize: theme.spacing(1.75),
    fontWeight: 'bold',
}));

const NeutralCircleContainer = styled('span')(({ theme }) => ({
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.neutral.border,
    borderRadius: '50%',
}));

const GridContent = styled('div')(({ theme }) => ({
    flexBasis: '50%',
    padding: theme.spacing(4, 2),
    display: 'flex',
    gap: theme.spacing(3),
    flexDirection: 'column',
}));

const BoxMainContent = styled('article')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    gap: theme.spacing(2),
}));

const AdminList = styled('ul')(({ theme }) => ({
    padding: 0,
    'li + li': {
        marginTop: theme.spacing(2),
    },
}));

const AdminListItem = styled('li')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row',
    gap: theme.spacing(2),
}));

type Props = {
    owners: PersonalDashboardSchemaProjectOwnersItem[];
    admins: PersonalDashboardSchemaAdminsItem[];
};

export const ContentGridNoProjects: React.FC<Props> = ({ owners, admins }) => {
    return (
        <ContentGrid container columns={{ lg: 12, md: 1 }}>
            <SpacedGridItem item lg={4} md={1}>
                <Typography variant='h3'>My projects</Typography>
            </SpacedGridItem>
            <SpacedGridItem item lg={8} md={1}>
                <Typography>Potential next steps</Typography>
            </SpacedGridItem>
            <SpacedGridItem item lg={4} md={1}>
                <GridContent>
                    <Typography>
                        You don't currently have access to any projects in the
                        system.
                    </Typography>
                    <Typography>
                        To get started, you can{' '}
                        <Link to='/projects?create=true'>
                            create your own project
                        </Link>
                        . Alternatively, you can review the available projects
                        in the system and ask the owner for access.
                    </Typography>
                </GridContent>
            </SpacedGridItem>
            <SpacedGridItem item lg={4} md={1}>
                <GridContent>
                    <TitleContainer>
                        <NeutralCircleContainer>1</NeutralCircleContainer>
                        Contact Unleash admin
                    </TitleContainer>
                    <BoxMainContent>
                        {admins.length ? (
                            <>
                                <p>
                                    Your Unleash administrator
                                    {admins.length > 1 ? 's are' : ' is'}:
                                </p>
                                <AdminList>
                                    {admins.map((admin) => {
                                        return (
                                            <AdminListItem key={admin.id}>
                                                <UserAvatar
                                                    sx={{
                                                        margin: 0,
                                                    }}
                                                    user={admin}
                                                />
                                                <Typography>
                                                    {admin.name ||
                                                        admin.username ||
                                                        admin.email}
                                                </Typography>
                                            </AdminListItem>
                                        );
                                    })}
                                </AdminList>
                            </>
                        ) : (
                            <p>
                                You have no Unleash administrators to contact.
                            </p>
                        )}
                    </BoxMainContent>
                </GridContent>
            </SpacedGridItem>
            <SpacedGridItem item lg={4} md={1}>
                <GridContent>
                    <TitleContainer>
                        <NeutralCircleContainer>2</NeutralCircleContainer>
                        Ask a project owner to add you to their project
                    </TitleContainer>
                    <BoxMainContent>
                        {owners.length ? (
                            <>
                                <p>Project owners in Unleash:</p>
                                <AvatarGroupFromOwners
                                    users={owners}
                                    avatarLimit={9}
                                />
                            </>
                        ) : (
                            <p>
                                There are no project owners in Unleash to ask
                                for access.
                            </p>
                        )}
                    </BoxMainContent>
                </GridContent>
            </SpacedGridItem>
            <SpacedGridItem item lg={4} md={1} />
            <SpacedGridItem item lg={8} md={1} />
        </ContentGrid>
    );
};