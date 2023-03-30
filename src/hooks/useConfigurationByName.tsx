import { useQuery } from 'react-query'
import ConfigurationsService from 'services/Configurations'

export default function useConfigurationByName (name: string) {
  return useQuery(`configurations[name:${name}]`, () => ConfigurationsService.findByName(name))
}
